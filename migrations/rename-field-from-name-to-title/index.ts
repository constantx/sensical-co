import {
  defineMigration,
  at,
  setIfMissing,
  unset,
} from 'sanity/migrate';

const from = 'name';
const to = 'title';

export default defineMigration({
  title: 'rename field from name to title',
  documentTypes: ['category', 'tag', 'author'],

  migrate: {
    document (doc, context) {
      return [
        at(to, setIfMissing(doc[from])),
        at(from, unset()),
      ];
    }, 
  },
});
