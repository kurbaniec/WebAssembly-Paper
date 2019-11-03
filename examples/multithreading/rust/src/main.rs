use std::time::{Instant};
use std::f64::INFINITY;
use comrak::{markdown_to_html, ComrakOptions};
use std::{thread, fs};
use std::sync::{Arc, Mutex};

fn main() {
    println!("Multi-threaded Markdown-Parsing Benchmark:");
    let mut times = Vec::new();
    for _ in 0..10 {
        let now = Instant::now();
        let mut workers = vec![];
        let file = Arc::new(Mutex::new(
            vec![String::new(), String::new(), String::new()]
        ));
        for i in 0..3 {
            let tmp = Arc::clone(&file);
            workers.push(thread::spawn(move || {
                let text = fs::read_to_string(
                    &format!("resources/md_test{}.md", i)
                ).unwrap();
                let mut options = ComrakOptions::default();
                options.unsafe_ = true;
                let mut file = tmp.lock().unwrap();
                file[i] = markdown_to_html(&text, &options);
            }));
        }
        for worker in workers {
            let _ = worker.join();

        }
        let html: String = file.lock().unwrap().join("");
        times.push(now.elapsed().as_nanos() as f64 / 1_000_000.0);
        let _ = fs::write("output.md", &html);
    }
    println!("{:?}", times);
    let avg: f64 = times.iter().sum::<f64>() / times.len() as f64;
    let min = times.iter().fold(INFINITY, |min, &val| if val < min{ val } else{ min });
    let max = times.iter().fold(0.0f64, |max, &val| if val > max{ val } else{ max });
    println!("Benchmark done. Results:\n\tAvg: {} ms\n\tMin: {} ms\n\tMax: {} ms", avg, min, max);
}
