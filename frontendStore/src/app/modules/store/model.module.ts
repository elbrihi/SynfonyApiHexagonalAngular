import { NgModule } from "@angular/core";
import { AuthService } from "../../core/services/authservice/auth.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "../../core/guards/auth.guard";

@NgModule({
    providers:[
        AuthService,
        AuthGuard
        

        
    ],
    imports: [
        
        HttpClientModule

    ],
    exports: [
     
    ]
  
})

export class ModelModule
{
    constructor()
    {
        console.log("modele module")
    }
}