if (typeof window === 'undefined') {
  const { server } = await import('./server');
  server.listen();
} else {
  const { worker } = await require('./browser');
  worker.start();
}

export {};
