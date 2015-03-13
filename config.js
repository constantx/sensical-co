module.exports = {
  'site-title': 'sensical.co | a no nonsense company',

  'url': 'http://sensical.co',

  'production': process.env.NODE_ENV !== 'development',

  'social': [{
    'type': 'dribbble',
    'title': 'dribbble',
    'icon': 'typcn typcn-social-dribbble',
    'href': 'https://dribbble.com/sensical',
    'last': false
  }, {
    'type': 'github',
    'title': 'github',
    'icon': 'typcn typcn-social-github',
    'href': 'https://github.com/sensical',
    'last': false
  }, {
    'type': 'linkedin',
    'title': 'linkedin',
    'icon': 'typcn typcn-social-linkedin',
    'href': 'https://www.linkedin.com/in/sensical',
    'last': false
  }, {
    'type': 'twitter',
    'title': 'twitter',
    'icon': 'typcn typcn-social-twitter',
    'href': 'https://twitter.com/sensical',
    'last': false
  }],

  'nav-main': [{
    'id': 'about',
    'label': 'about',
    'href': '#about'
  }, {
    'id': 'team',
    'label': 'team',
    'href': '#team'
  }, {
    'id': 'work',
    'label': 'work',
    'href': '#work'
  }, {
    'id': 'contact',
    'label': 'contact',
    'href': '#contact'
  }]
};
