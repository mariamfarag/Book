import { HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
    let modifiedReq = req;

    // request 
    if (req.method == "POST") {
        modifiedReq = req.clone({ // clone => meaning take copy of url and modified because this fun immutable
            headers: req.headers.append("lang", "en")
        })
    }

    // var loader with true until reteurn with response

    // response 
    return next(modifiedReq).pipe(
        tap((event) => { // call when call in observable (submit or error)
            if (event.type == HttpEventType.Response) {
                console.log(event)
                if(event.status == 200){
                  // finshed loader load`
                }
                else if(event.status == 500)
                {

                }
            }
        })
    );
}    