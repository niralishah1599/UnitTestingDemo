import { TestBed, inject } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('Hero Service', () => {
    let mockMessageService;
    // let httpTestingController:HttpTestingController;
    // let service:HeroService;
    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers:
                [
                    HeroService,
                    {
                        provide: MessageService,
                        useValue: mockMessageService
                    }
                ]
        });
        // httpTestingController = TestBed.get(httpTestingController);
        //service = TestBed.get(HeroService);
    });

    describe('getHero', () => {

        it(' should call get with correct url ', inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
            service.getHero(3).subscribe();
            const req = controller.expectOne('api/heroes/3');
            req.flush({ id: 3, name: "nirali", strength: 2 })
            controller.verify()

            //delete hero
            // service.deleteHero(3).subscribe();
            // const req  = controller.expectOne('api/heroes/3');
            // req.flush({id:3,name:"nirali",strength:2})
            //  controller.verify();

        }));

    });
});



