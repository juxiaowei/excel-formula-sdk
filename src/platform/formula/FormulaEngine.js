const SingleFormulaCoreInst = require('./core/SingleFormulaCore').INSTANCE;
const SingleFormulaAST = require('platform/formula/core/SingleFormulaAST').SingleFormulaAST;
const CellDependencyBuilder = require('./cellDependency/DependencyBuilder');
const CellDependencyFinder = require('./cellDependency/DependencyFinder');
const DependencyGraph = require('./cellDependency/DependencyGraph').DependencyGraph;

/**
 * 操作全部的公式。
 */

class WorkBookContext {
  constructor() {
    this.activeSheetName = null;
  }

  setActiveSheetName(sheetName) {
    this.activeSheetName = sheetName;
  }
}
/**
 * 处理单元格中的公式，以及单元之间的依赖关系。
 * 
 */
class FormulaEngine {
  constructor() {
    this.depGraph = new DependencyGraph();

    // 存储单元格的所有设置的公式
    // key: cellAddress
    // value: formula 文本
    this.formulas = {}; 
  }

  /**
   * 用户删除一个公式时调用。
   */
  clearCellFormula(workBookContext, cellAddr) {
    const activeSheetName = workBookContext.activeSheetName;
    const builder = new CellDependencyBuilder(this.depGraph);
    builder.clear(activeSheetName, cellAddr);
  }

  /**
   * 用户输入一个公式后调用。
   * @param {WorkBookContext} workBookContext 工作簿上下文，包含当前激活的工作表sheet。
   * @param {Object} cellAddr 单元格地址对象 {column:<1..n>, row:<1..n>}, 
   * @param {String} formula 公式文本（包含=）
   */
  setCellFormula(workBookContext, cellAddr, formula) {
    const activeSheetName = workBookContext.activeSheetName;
    const parseTree = SingleFormulaCoreInst.parse(formula);
    const ast = new SingleFormulaAST(parseTree);

    const builder = new CellDependencyBuilder(this.depGraph);
    builder.setFormulaAST(ast);
    builder.build(activeSheetName, cellAddr);
  }

  getCellFormula(workBookContext, cellAddr) {
    const activeSheetName = workBookContext.activeSheetName;
    const finder = new CellDependencyFinder(this.depGraph);
    return finder.getCellFormula(activeSheetName, cellAddr);
  }
 
  /**
   * 用户调整表结构：增加行
   */
  addRow(sheetName, columnRowIndex) {

  }

  /**
   * 用户调整表结构：删除行
   */
  removeRow(sheetName, columnRowIndex) {

  }

  /**
   * 用户调整表结构：增加列
   */
  addColumn(sheetName, columnRowIndex) {

  }

  /**
   * 用户调整表结构：删除列
   */
  removeColumn(sheetName, columnRowIndex) {

  }
  /**
   * 用户调整表结构：移动列
   */
  moveColumn(sheetName, column, toColumn) {

  }
  /**
   * 用户调整表结构：移动行
   */
  moveRow(sheetName, row, toRow) {

  }
}

exports.FormulaEngine = FormulaEngine;