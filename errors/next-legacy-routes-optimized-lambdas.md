# `@vercel/next` Legacy Routes Optimized Lambdas Opt-out

#### Why This Warning Occurred

`@vercel/next` by default now bundles pages into optimized functions, minimizing bootup time and increasing overall application throughput.
When legacy `routes` are added in `appz.json`, they cause conflicts with this optimization, so it is opted-out.

#### Possible Ways to Fix It

Migrate from using legacy `routes` to the new `rewrites`, `redirects`, and `headers` configurations in your `appz.json` file or leverage them directly in your `next.config.js` with the built-in [custom routes support](https://github.com/vercel/next.js/issues/9081)

### Useful Links

- [Rewrites Documentation](https://youappz.com/docs/configuration?query=rewrites#project/rewrites)
- [Redirects Documentation](https://youappz.com/docs/configuration?query=rewrites#project/redirects)
- [Headers Documentation](https://youappz.com/docs/configuration?query=rewrites#project/headers)
