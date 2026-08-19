import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  console.log('INTERCEPTOR TOKEN:', token);

  if (token) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('JWT ATTACHED TO REQUEST');

    return next(authRequest);
  }

  console.log('NO JWT FOUND');

  return next(req);
};