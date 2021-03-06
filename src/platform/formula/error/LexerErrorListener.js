/**
 * 识别文法错误。
 */


const BaseErrorListener = require('./BaseErrorListener');

class LexerErrorListener extends BaseErrorListener {
  

  /**
   * 检查文法错误
   *
   * @param {object} recognizer 必要的解析支持代码. 大多时候是错误恢复内容。
   * @param {object} symbol 非法符号
   * @param {int} line 非法符号的行号
   * @param {int} column 非法符号的列号
   * @param {string} message 错误信息
   * @param {RecognitionException} exception 异常信息
   */
  syntaxError(recognizer, symbol, line, column, message, exception) {
    super.recordError(recognizer, symbol, line, column, message, exception);
    
    var rawText = recognizer.inputStream.toString();

    var errHandler = this.getErrorHandler();
    if(errHandler && errHandler.handle instanceof Function) {
      errHandler.handle(rawText, symbol, line, column, '无法识别的符号');
    }
  }
}

module.exports = LexerErrorListener;