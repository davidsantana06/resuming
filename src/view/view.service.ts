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

  async render(template: string, data: object): Promise<string> {
    const path = this.mountPath(template);
    const content = await fs.readFile(path, 'utf8');
    const compiled = handlebars.compile(content);
    return compiled({
      baseUrl: `http://localhost:${PORT}`,
      ...data,
    });
  }

  async export(template: string, data: object): Promise<Buffer> {
    const html = await this.render(template, data);

    const page = await this.browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBytes = await page.pdf({
      format: 'A4',
      margin: { top: '50px', right: '40px', bottom: '50px', left: '40px' },
    });

    await page.close();

    return Buffer.from(pdfBytes);
  }

  private mountPath(template: string): string {
    return `view/${template}.hbs`;
  }
}
