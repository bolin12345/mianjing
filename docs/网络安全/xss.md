---
title: "XSS(跨站脚本攻击)"
---

# XSS(跨站脚本攻击)

XSS（跨站脚本攻击）是一种代码注入攻击，攻击者在目标网站注入恶意代码，当用户登录网站时就会执行这些恶意代码。通过这些脚本可以读取 cookie、session、tokens 等其他敏感信息，对用户进行钓鱼欺诈。

## 防护措施

1. **对用户输入进行验证和转义**

   - 在接收用户输入时，应先对输入数据进行验证，确保其符合预期格式。
   - 使用正则表达式或其他验证方法来检查输入是否合法。
   - 对用户输入内容进行适当的转义，以防止 XSS 攻击。

2. **使用合适的编码方式进行内容转义**

   - 当将用户输入嵌入到 HTML 页面时，必须对输入内容进行适当的转义，以防止脚本注入。
   - 使用 `encodeURIComponent` 或专门的库（如 `he`）来转义 HTML 特殊字符。

3. **设置 HTTP 头**

   - 通过正确设置 HTTP 头信息，如 `Content-Security-Policy`（CSP），可以有效防止 XSS 攻击。
   - CSP 可以限制页面加载的资源，防止加载来自不可信来源的脚本。

4. **对用户输入进行验证和过滤**

   - 验证输入是否符合预期格式，过滤掉一些特殊字符和标签（例如 `<script>`），避免注入恶意脚本。
   - 使用白名单机制，只允许特定的字符和标签。

5. **使用 http-only cookie**
   - 在设置 cookie 时，将 `httpOnly` 标志设置为 `true`，以防止客户端脚本访问 cookie。
   - JavaScript 无法取得这种 cookie 的值，有助于保护 cookie 不被窃取或篡改

### 示例代码

#### JavaScript 验证和转义

```javascript
function validateInput(input) {
  const regex = /^[a-zA-Z0-9\s]+$/; // 只允许字母、数字和空格
  return regex.test(input);
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const userInput = "<script>alert('XSS');</script>";
if (validateInput(userInput)) {
  const safeOutput = escapeHtml(userInput);
  console.log(safeOutput); // 输出: &lt;script&gt;alert('XSS');&lt;/script&gt;
} else {
  console.log("Invalid input");
}
```
