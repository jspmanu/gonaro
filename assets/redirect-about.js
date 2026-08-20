// /over/ -> /about/, preserving any fragment that a meta-refresh would drop.
// The meta-refresh in the stub stays as the no-JS fallback. External file
// because the site CSP is script-src 'self'.
location.replace('/about/' + (location.hash || ''));
