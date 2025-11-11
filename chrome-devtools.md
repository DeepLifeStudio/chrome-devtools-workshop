什么是
DevTools MCP Server？

是一种服务程序，
它用 MCP 协议封装 DevTools 功能，
用于给大模型提供读取和控制浏览器的能力。

大模型用 MCP 协议与浏览器交流，
调用到所需的 DevTools 数据和能力

能力和应用场景
AI + MCP观测效果 AI生成代码  AI + MCP 定位原因 发现异常
chrome-devtools-mcp lets your coding agent (such as Gemini, Claude, Cursor or Copilot) control and inspect a live Chrome browser. It acts as a Model-Context-Protocol (MCP) server, giving your AI coding assistant access to the full power of Chrome DevTools for reliable automation, in-depth debugging, and performance analysis.

Tool reference | Changelog | Contributing | Troubleshooting
Key features
Get performance insights: Uses Chrome DevTools to record traces and extract actionable performance insights.
Advanced browser debugging: Analyze network requests, take screenshots and check the browser console.
Reliable automation. Uses puppeteer to automate actions in Chrome and automatically wait for action results.
Disclaimers
chrome-devtools-mcp exposes content of the browser instance to the MCP clients allowing them to inspect, debug, and modify any data in the browser or DevTools. Avoid sharing sensitive or personal information that you don't want to share with MCP clients.

Tools
If you run into any issues, checkout our troubleshooting guide.

Input automation (8 tools)
click
drag
fill
fill_form
handle_dialog
hover
press_key
upload_file
Navigation automation (6 tools)
close_page
list_pages
navigate_page
new_page
select_page
wait_for
Emulation (2 tools)
emulate
resize_page
Performance (3 tools)
performance_analyze_insight
performance_start_trace
performance_stop_trace
Network (2 tools)
get_network_request
list_network_requests
Debugging (5 tools)
evaluate_script
get_console_message
list_console_messages
take_screenshot
take_snapshot

