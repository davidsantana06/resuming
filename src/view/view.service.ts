import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import puppeteer, { Browser } from 'puppeteer';
import { PORT } from 'src/environments';

@Injectable()
export default class ViewService implements OnModuleInit, OnModuleDestroy {
  private browser: Browser;

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  async render(view: string, context: object): Promise<string> {
    const filepath = this.mountFilepath(view);
    const content = await fs.readFile(filepath, 'utf8');
    const compiler = handlebars.compile(content);
    return compiler({
      baseUrl: `http://localhost:${PORT}`,
      ...context,
    });
  }

  async export(view: string, context: object): Promise<Buffer> {
    const html = await this.render(view, context);

    const page = await this.browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBytes = await page.pdf({
      format: 'A4',
      margin: { top: '50px', right: '40px', bottom: '50px', left: '40px' },
    });

    await page.close();

    return Buffer.from(pdfBytes);
  }

  private mountFilepath(view: string): string {
    return `views/${view}.hbs`;
  }
}
