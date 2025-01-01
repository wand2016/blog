export let pagefind: any = null;

export async function loadPagefind() {
  if (!pagefind) {
    pagefind = await import(
      // @ts-expect-error pagefind.js generated after build
      /* webpackIgnore: true */ '/pagefind/pagefind.js'
    );
    await pagefind.options({
      highlightParam: 'highlight',
    });
    pagefind.init();
  }
}
