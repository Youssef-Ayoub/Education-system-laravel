import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private http:HttpClient) {
   }
   ngOnInit() {

   }
   getData(){
    const headers = { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNWI4YTY5NjVmMzY5NzE1ZTRmNTM1ZWFiNWI1MGZmYmQwMDlhYjhlNDJjOGVlYmZhNjRmNTYxMTI5NjRkYmI5MzUyODg1NDUwMWU0Y2U2NzQiLCJpYXQiOjE2ODcwNDI2NTIuNjA0Njc5LCJuYmYiOjE2ODcwNDI2NTIuNjA0Njg0LCJleHAiOjE3MTg2NjUwNTIuNTkxMTA5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.iFBYnQkGmAF9f-kZMVn51Ases79immJ09XQES6RJlvDsxekUKOxuAbEZiLGkbaelyDpOgK_ZrPODsVOCumOauld4vuN7vOfLeD7vxa1AoCQifbOZcPlV3pOF_S1zLU7AiVputuYAC_PsgsvX0MQl6Z_gcfu3yUnqTzg1kwpudRzrFiriARJU9SoErlhKCw7ydWjEFBYAjFiwNKVRWZxbLInJ1zLEozcT42MUP_HF7LJqZTl5Jx2FFztpefM8yUBUlZ0NtfH0hp6ytmlcmdZT89CEaIDYZYcjRNLuZNTc9qPoz2nQ6yJ3TGMM5EURG7GNmmdTZ9J9v_avdRuwNTaXFs-rArXwFv2K03_RbCoODEFr9_nkL8vScCq7fKBcQ_dgZvjQFfmAzIMhWvjKt83kL1j1nDX9BDwGe-oBl7W6-g0hXogHLUCSRMREM0ppQm4ENEYYUF2BRri9-GH_ogxRpa9o_1zilk8JZNw34rht2VDZ2UQCnlKfJ_9Qw3ZGG9VRoqqXOBIe_0QMTWO3LM_qcyQoGpf4Zagl1gFpG5Bch1tF2gEJXQT5P7Iati1-9vn8UOrzh38AHpi9Odfw5b05KXVcPMycZXB2ylg0ilhDGk56yTzx3bTd80Hid-zWvehrC6wZwdLN3AsMYROQBGA3V-3AFxSE9J01k-K_El3mBB4' }
    return this.http.get<any>('http://localhost/Education-system-laravel/laravel%20test/public/api/courses' , {headers})
  }
}
