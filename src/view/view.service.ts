import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ViewService implements OnModuleInit, OnModuleDestroy {
  private browser: puppeteer.Browser;

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });
  }

  async render(template: string, data: object) {
    const content = await fs.readFile(`view/${template}.hbs`, 'utf8');
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
    const html = await this.render(template, data);

    const page = await this.browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const exportStrategies = {
      pdf: () => page.pdf({ format: 'A4' }),
      png: () => page.screenshot(),
    };

    const file = await exportStrategies[format]();
    await page.close();

    return Buffer.from(file);
  }

  async onModuleDestroy() {
    await this.browser.close();
  }
}
