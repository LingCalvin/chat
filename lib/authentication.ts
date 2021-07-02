export async function signIn(username: string, password: string) {
  const res = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const { status } = res;

  if (status === 200) {
    const body = await res.json();
    return body.accessToken;
  }

  if (status === 401) {
    throw new Error('Invalid credentials.');
  }

  throw new Error('An unexpected error has occurred.');
}

export async function signUp(username: string, password: string) {
  const res = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const { status } = res;

  if (status === 201) {
    return;
  }

  if (status === 409) {
    throw new Error('The requested username is already taken.');
  }

  throw new Error('An unexpected error has occurred.');
}
