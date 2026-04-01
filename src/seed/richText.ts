export function paragraphsToRichText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: paragraphs.map((paragraph) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: [
          {
            type: 'text',
            version: 1,
            text: paragraph,
            format: 0,
            mode: 'normal',
            style: '',
            detail: 0,
          },
        ],
      })),
    },
  }
}
