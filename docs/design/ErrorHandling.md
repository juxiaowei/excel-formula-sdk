## 错误处理

当有公式的解析错误时，仍然需要使用 visitor 访问解析树。以便支持变量高亮等内容。

当有解析错误时，对公式求值会出错。

本项目打包后，形成一个独立的组件。在使用时，需要与表格组件、编辑器组件配合。

公式解析出错时，使用监听器处理错误，不使用异常。
公式求值出错时，抛出异常；异常仅用于求值引擎内部使用，用于方便处理不同类型的错误；外部显示计算错误的结果时，使用文本显示。