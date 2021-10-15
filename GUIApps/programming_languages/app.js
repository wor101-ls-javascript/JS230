const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

let buttons;

// create tempalte for each language
// heading (language name)
// text
// show more / show less button

function languagesWithPreviewText() {
  return languages.map(lang => {
    return {
      name: lang.name,
      description: lang.description.slice(0, 120) + '..',
    }
  });
}

function renderLanguages() {
  let languageTemplate = $('#languageTemplate');
  let languageScript = Handlebars.compile(languageTemplate.html())
  let langDivs = languageScript({'languages': languagesWithPreviewText()})
  $('#languages').append(langDivs);
}

function toggleText(event) {
  event.preventDefault();
  let buttonType = event.target.className;
  let languageName = event.target.parentElement.id;

  if (buttonType === 'more') {
    let fullDescription = languages.filter(lang => lang.name === languageName)[0]['description'];
    $('#' + languageName + ' p').text(fullDescription);
    event.target.className = 'less';
    $(event.target).text('Show Less');
  } else {
    let shortDescription = languagesWithPreviewText().filter(lang => lang.name === languageName)[0]['description'];
    $('#' + languageName + ' p').text(shortDescription);
    event.target.className = 'more';
    $(event.target).text('Show More');    
  }
  console.log(languageName);
  console.log(buttonType);
}

$(document).ready(() => { 
  renderLanguages();

  buttons = $('#languages button');
  buttons.click(toggleText);

});