import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";



describe('Heroes Component (shallow test)',()=>{
    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let Heroes;
@Component({
        selector: 'app-hero',
        template: '<div></div>',
})
class FakeHeroComponent {
        @Input() hero: Hero;
       // @Output() delete = new EventEmitter();
     }

    beforeEach(()=>{
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
        Heroes=[
            {id:1,name:'nirali',strength:2},
            {id:2,name:'rajat',strength:5},
            {id:3,name:'rahul',strength:8},
        ]
        TestBed.configureTestingModule({
            declarations:[HeroesComponent,FakeHeroComponent],
            providers:[
                {provide: HeroService ,useValue:mockHeroService}],
                //schemas:[NO_ERRORS_SCHEMA]
        });
        fixture=TestBed.createComponent(HeroesComponent);
    })
    it('should set heroes correctly from the service',()=>{
        mockHeroService.getHeroes.and.returnValue(of(Heroes));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    })
    it('should create one li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(Heroes));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})