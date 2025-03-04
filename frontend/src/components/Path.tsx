const app_name = 'dressmeupproject.com'; // Replace with your custom domain

export function buildPath(route: string): string {
  if (process.env.NODE_ENV === 'production') {
    return `http://${app_name}/api/${route}`;
  } else {
    return 'http://localhost:5001/' + route;
  }
}