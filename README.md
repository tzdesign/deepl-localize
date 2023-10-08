# deepl $localize tranlate

This tool uses deepl to translate all extracted languages by angular/localize.

## About

### What is deepl?

DeepL is a machine translation company that offers neural machine translation services. Neural machine translation (NMT) is a type of machine translation that uses artificial neural networks to improve the accuracy and fluency of translations. DeepL is known for its high-quality translations and is considered one of the leading providers in the field of machine translation.

DeepL's most well-known product is the DeepL Translator, which allows users to translate text and documents between multiple languages. It supports a wide range of languages and is often praised for its ability to produce translations that are more natural and contextually accurate compared to traditional rule-based machine translation systems.

[See deepl](http://deepl.com/)

### What is $localize?

The [$localize ](https://angular.io/api/localize/init/localize)function is part of the [Angular framework](https://angular.io/), which is a popular open-source JavaScript framework for building web and mobile applications. It is specifically used for internationalization (i18n) and localization (l10n) purposes within Angular applications.

The $localize function is used to mark and translate text within an Angular application. It allows developers to define messages in different languages and provides a way to extract those messages for translation. Here's how it typically works:

1. Developers use the $localize function to mark text in their Angular templates and components that need to be translated. For example:
```tsx
const message = $localize`Hello, World!`;
```
2. After marking the text, developers can use Angular's localization tools to extract these marked messages into a translation file.
3. Translators can then provide translations for the marked messages in various languages.
4. When the application runs, Angular will use the appropriate translation based on the user's language preference or the selected language.

Keep in mind that Angular's internationalization and localization features, including $localize, may evolve over time, so it's a good practice to refer to the official Angular documentation or resources for the most up-to-date information on how to use these features in your Angular applications.

> Localize perfectly works with other frameworks as well. See [Miško's approach](https://github.com/mhevery/qwik-i18n) for [qwik](https://qwik.builder.io/).

## Installation

```shell
npm install deepl-localize -D
```
or
```shell
yarn add deepl-localize -D
```

Of course you can use it with `npx` as well.

```shell
npx deepl-localize translate -b your/path/en-US.json -l de-DE fr-FR -i de-DE -a "YOUR-DEEPL-API-KEY"
```

## Translation

### Usage
                             
```shell
deepl-localize translate -b your/path/en-US.json -l de-DE fr-FR -i de-DE -a "YOUR-DEEPL-API-KEY"
```

### Options:

| Command                            | Description                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| -a,--api-key <value>               | The deepl api key. If none is given, the environment variable DEEPL_API_KEY is used.                          |
| -v, --version                      | output the version number                                                                                     |
| -b, --base  <value>                | The base file path.                                                                                           |
| -o, --output <value>               | The output folder path. If none is given, the base folder is used.                                            |
| -l, --locales  [value...]          | Locales to translate to. For example de-DE fr-FR. If none is given, no translation will happen. (default: []) |
| -i, --informal-locales  [value...] | Locales to translate less formal. For example de-DE will use du instead of sie. (default: [])                 |
| -h, --help                         | display help for command                                                                                      |


## Stale

### Usage
                             
```shell
deepl-localize remove-stale -b your/path/en-US.json -l de-DE fr-FR
```

### Options:

| Command                   | Description                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| -v, --version             | output the version number                                                                                     |
| -b, --base  <value>       | The base file path.                                                                                           |
| -o, --output <value>      | The output folder path. If none is given, the base folder is used.                                            |
| -l, --locales  [value...] | Locales to translate to. For example de-DE fr-FR. If none is given, no translation will happen. (default: []) |
| -d,--dry-run              | Just show the stale translations. The script will not remove and just show them. (default: false)             |
| -h, --help                | display help for command                                                                                      |