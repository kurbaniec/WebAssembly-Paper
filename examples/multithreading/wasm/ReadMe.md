# Multi-threaded File-Manipulation Benchmark - WebAssembly

## Run benchmark
```
wasm-pack build --release --no-typescript
cd www
npm install
npm run start
```
Go to http://localhost:8080 and click the `start` button.

## Benchmark
31.10.2019 - Chrome Browser (Version 78)

![Benchmark](benchmark_chrome.PNG)

31.10.2019 - Firefox Browser (Version 70)

![Benchmark](benchmark_firefox.PNG)


## Sources:
* [Project basis](https://github.com/rustwasm/wasm-pack-template)
