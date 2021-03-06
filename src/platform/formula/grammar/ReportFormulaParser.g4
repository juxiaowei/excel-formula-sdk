parser grammar ReportFormulaParser;

options {
    tokenVocab = ReportFormulaLexer;
}

formulaExpr : '='? expressionStatement EOF; // EOF 终止符需要添加，保证所有字符都会解析
expressionStatement: expressionSequence;

expressionSequence : singleExpression ; //(',' singleExpression)* 

singleExpression
    : singleExpression arguments                                                # ArgumentsExpression
    | '+' singleExpression                                                      # UnaryPlusExpression
    | '-' singleExpression                                                      # UnaryMinusExpression
    | <assoc=right> singleExpression op='**' singleExpression                      # PowerExpression
    | singleExpression op=('*' | '/' | '%') singleExpression                    # MultiplicativeExpression
    | singleExpression op=('+' | '-') singleExpression                          # AdditiveExpression
    | singleExpression op=('<' | '>' | '<=' | '>=') singleExpression            # RelationalExpression
    | singleExpression op=('==' | '!=' ) singleExpression                       # EqualityExpression
    | singleExpression '&&' singleExpression                                    # LogicalAndExpression
    | singleExpression '||' singleExpression                                    # LogicalOrExpression
    | singleExpression '?' singleExpression ':' singleExpression                # TernaryExpression
    | <assoc=right> singleExpression '=' singleExpression                       # AssignmentExpression
    | identifier                                                                # IdentifierExpression
    | literal                                                                   # LiteralExpression
    | arrayLiteral                                                              # ArrayLiteralExpression
    | objectLiteral                                                             # ObjectLiteralExpression
    | '(' expressionSequence ')'                                                # ParenthesizedExpression
    ;

arguments
    : '('(argument (',' argument)* ','?)?')'
    ;

argument
    : singleExpression 
    | identifier
    ;

objectLiteral
    : '{' (propertyAssignment (',' propertyAssignment)*)? ','? '}'
    ;

arrayLiteral
    : ('[' elementList ']')
    ;

elementList
    : ','* arrayElement? (','+ arrayElement)* ','* // Yes, everything is optional
    ;

arrayElement
    : singleExpression
    ;

propertyAssignment
    : propertyName ':' singleExpression                                             # PropertyExpressionAssignment
    | '[' singleExpression ']' ':' singleExpression                                 # ComputedPropertyExpressionAssignment
    ;

propertyName
    : identifierName
    | StringLiteral
    | numericLiteral
    | '[' singleExpression ']'
    ;

identifierName
    : identifier
    | reservedWord
    ;


// 标识符

identifier
    : refItemCode           #IdentifierRefItemCode
    | CellAddressLiteral    #IdentifierCellAddress
    | CellRangeLiteral      #IdentifierCellRange
    | CellFloatRangeLiteral #IdentifierCellFloatRange
    | Identifier            #IdentifierPlainText
    ;

refItemCode: '@' Identifier; //报表项的标识符，浮动行的标识符

// 字面量
literal
    : NullLiteral       #NullLiteralExpression
    | BooleanLiteral    #BooleanLiteralExpression
    | StringLiteral     #StringLiteralExpression
    | numericLiteral    #NumericLiteralExpression
    ;


numericLiteral
    : percentageLiteral  #PercentageLiteralExpression
    | BasicNumberLiteral #BasicNumberLiteralExpression
    ;

percentageLiteral
    : BasicNumberLiteral '%';

reservedWord
    : keyword
    | BooleanLiteral
    ;    

keyword
    : If
    ;

eos
    : SemiColon
    | EOF
    ;