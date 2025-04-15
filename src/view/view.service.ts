import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export class ViewService implements OnModuleInit, OnModuleDestroy {
  private browser: Browser;

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });
  }

  private mountPath(template: string): string {
    return `view/${template}.hbs`;
  }

  async render(template: string, data: object) {
    const path = this.mountPath(template);
    const content = await fs.readFile(path, 'utf8');
    const compiled = handlebars.compile(content);
    return compiled({
      baseUrl: `http://localhost:${process.env.PORT ?? 3000}`,
      ...data,
    });
  }

  async export(
    template: string,
    data: object,
    format: 'pdf' | 'png',
  ): Promise<Buffer> {
    const exportAsPdf = (page: Page) =>
      page.pdf({
        format: 'A4',
        margin: { top: '50px', right: '40px', bottom: '50px', left: '40px' },
      });

    const exportAsPng = (page: Page) => page.screenshot({ fullPage: true });

    const html = await this.render(template, data);

    const page = await this.browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const strategy = { pdf: exportAsPdf, png: exportAsPng }[format];
    const file = await strategy(page);

    await page.close();

    return Buffer.from(file);
  }

  async onModuleDestroy() {
    await this.browser.close();
  }
}
