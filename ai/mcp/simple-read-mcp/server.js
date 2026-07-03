import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from 'fs/promises';

// 新版实例化
const server = new McpServer({
  name: 'simple-read-mcp',
  version: '1.0.0'
});

// 新版极简注册工具，内置schema校验，不用手动写JSON Schema
server.tool(
  "read_file",
  "读取指定路径的本地文件内容",
  {
    path: z.string().describe("文件的绝对或相对路径") // 校验参数是否为字符串
  },
  async ({ path }) => {
    try {
      const content = await fs.readFile(path, 'utf-8');
      return {
        content: [{ type: "text", text: content }]
      };
    } catch (err) {
      return {
        isError: true,
        content: [{ type: "text", text: `读取文件失败：${err.message}` }]
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP read_file 服务已启动（stdio模式）");
}

main().catch(console.error);