import { terminal } from 'terminal-kit';

export default (port: number) => {
  terminal.white();
  terminal.moveTo(2, 2);
  terminal('Welcome to the API - Sistema de gerenciamento de escolas!');
  terminal.moveTo(5, 3);
  terminal('🚀\tAPI Server is running at:');
  terminal.brightBlue();
  terminal(`\thttp://localhost:${port}`);
  terminal.moveTo(5, 4);
  terminal.white();
  terminal('📝\tAPI Docs is available at:');
  terminal.brightGreen();
  terminal(`\thttp://localhost:${port}/api-docs`);
  terminal.nextLine(1);
  terminal.white();
  terminal.eraseDisplayBelow();
};
