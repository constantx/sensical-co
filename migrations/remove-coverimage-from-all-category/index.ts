import { at, defineMigration, unset } from 'sanity/migrate';

export default defineMigration({
  title: 'remove coverImage from all category',
  documentTypes: ['category'],

  migrate: { document (doc, context) {
    // this will be called for every document of the matching type
    // any patch returned will be applied to the document
    // you can also return mutations that touches other documents

    return at('isMainMenu', unset());
  } },
});
