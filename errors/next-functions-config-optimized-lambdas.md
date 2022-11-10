# `@vercel/next` Functions Config Optimized Lambdas Opt-out

#### Why This Warning Occurred

`@vercel/next` by default now bundles pages into optimized functions, minimizing bootup time and increasing overall application throughput.
When the `functions` config is added in `appz.json`, it causes conflicts with this optimization, so it is opted-out.

#### Possible Ways to Fix It

Remove the `functions` config from your `appz.json` to take advantage of this optimization.

### Useful Links

- [Functions Config Documentation](https://youappz.com/docs/configuration?query=functions#project/functions)
