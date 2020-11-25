import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";


@Injectable()
export class OwnerService {

    path = 'owner';

    constructor(private httpClientService: HttpClientService) { }

    public get(): any {
        return this.httpClientService.get(this.path);
    }

    public getById(id: number): any {
        return this.httpClientService.getById(this.path, id);
    }

    public getOwnerPets(id: number): any {
        return this.httpClientService.getOwnerPets(this.path, id);
    }

    public post(id: number, obj: any): any {
        return this.httpClientService.post(this.path, obj);
    }

    public put(id: number, obj: any): any {
        return this.httpClientService.put(this.path, id, obj);
    }

    public delete(id: number): any {
        return this.httpClientService.delete(this.path, id);
    }
}
