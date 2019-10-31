use std::time::{Instant};
use std::f64::INFINITY;

fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 1,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("Fibonacci (30th number) Benchmark:");
    let mut times = Vec::new();
    for i in 0..10 {
        let now = Instant::now();
        let number = fibonacci(30);
        times.push(now.elapsed().as_nanos() as f64 / 1_000_000.0);
        println!("Run {}, number is {}", i, number);
    }
    println!("{:?}", times);
    let avg: f64 = times.iter().sum::<f64>() / times.len() as f64;
    let min = times.iter().fold(INFINITY, |min, &val| if val < min{ val } else{ min });
    let max = times.iter().fold(0.0f64, |max, &val| if val > max{ val } else{ max });
    println!("Benchmark done. Results:\n\tAvg: {} ms\n\tMin: {} ms\n\tMax: {} ms", avg, min, max);
}
