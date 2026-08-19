// /prijzen/ -> /plans/, preserving any fragment (for example #faq) that a
// meta-refresh would drop. The meta-refresh in the stub stays as the no-JS
// fallback. External file because the site CSP is script-src 'self'.
location.replace('/plans/' + (location.hash || ''));
