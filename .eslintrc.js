module.exports = {
  "extends": ["react-app", "react-app/jest", "prettier"],
  "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  },
  "rules": {
    "no-irregular-whitespace": "off",
    "semi": ["error", "always"],
    "quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "no-unused-vars": ["error"],
    "no-var": ["error"],
    "react/jsx-no-target-blank": "off",
    "jsx-a11y/alt-text": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2
      }
    ],
    "no-multi-spaces": ["error"],
    "import/newline-after-import": ["error"],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true
      }
    ],
    "space-infix-ops": ["error"],
    "no-extra-boolean-cast": ["error"],
    "constructor-super": "error",
    "no-useless-constructor": "warn",
    "object-shorthand": [
      "error",
      "always",
      {
        "avoidQuotes": true
      }
    ],
    "no-undef": ["error"],
    "no-use-before-define": ["error"],
    "array-bracket-spacing": ["error", "always"],
    "array-callback-return": "off",
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "camelcase": [
      "error",
      {
        "allow": ["^UNSAFE_"],
        "properties": "always",
        "ignoreDestructuring": true
      }
    ],
    "func-names": ["error", "as-needed"],
    "func-call-spacing": ["error", "never"],
    "function-paren-newline": [
      "error",
      {
        "minItems": 4
      }
    ],
    "eol-last": ["error", "always"],
    "implicit-arrow-linebreak": ["error", "beside"],
    "jsx-quotes": ["error", "prefer-double"],
    "lines-between-class-members": ["error", "always"],
    "new-cap": [
      "error",
      {
        "newIsCap": true
      }
    ],
    "no-mixed-operators": ["error"],
    "no-trailing-spaces": [
      "error",
      {
        "ignoreComments": true
      }
    ],
    "no-unneeded-ternary": ["error"],
    "no-whitespace-before-property": ["error"],
    "operator-linebreak": ["error", "before"],
    "quote-props": ["error", "as-needed"],
    "semi-spacing": ["error"],
    "semi-style": ["error", "last"],
    "space-before-blocks": ["error"],
    "space-unary-ops": ["error"],
    "switch-colon-spacing": ["error"],
    "template-tag-spacing": ["error"],
    "arrow-spacing": ["error"],
    "no-class-assign": ["error"],
    "no-const-assign": ["error"]
  }
}
