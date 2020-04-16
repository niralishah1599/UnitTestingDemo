import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA} from "@angular/core";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";



describe('Heroes Component (deep test)',()=>{
    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let Heroes;

    beforeEach(()=>{
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
        Heroes=[
            {id:1,name:'nirali',strength:2},
            {id:2,name:'rajat',strength:5},
            {id:3,name:'rahul',strength:8},
        ]
        TestBed.configureTestingModule({
            declarations:[HeroesComponent,HeroComponent],
            providers:[
                {provide: HeroService ,useValue:mockHeroService}],
                schemas:[NO_ERRORS_SCHEMA]
        });
        fixture=TestBed.createComponent(HeroesComponent);
       
    })
   
    it('should render each hero as HeroComponent',()=>{
        mockHeroService.getHeroes.and.returnValue(of(Heroes));
        //run ngOnInit
        fixture.detectChanges();



       const heroComponentDEs=fixture.debugElement.queryAll(By.directive(HeroComponent));
       expect(heroComponentDEs.length).toEqual(3);

       for(let i=0;i<heroComponentDEs.length;i++)
       {
           expect(heroComponentDEs[i].componentInstance.hero).toEqual(Heroes[i]);
       }
    });

    it('should call heroService.deleteHero  when the hero components delete button is clicked',()=>{
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(Heroes));
        //run ngOnInit
        fixture.detectChanges();
        //triggering events on elements
        const heroComponents=fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
        .triggerEventHandler('click',{stopPropagation:()=>{}});
        //emit the event from the child component
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(Heroes[0]);

  
    });

    it('should add a new hero to the hero list when the add button is clicked',()=>{
        mockHeroService.getHeroes.and.returnValue(of(Heroes));
        //run ngOnInit
        fixture.detectChanges();
        const name="shah";
        mockHeroService.addHero.and.returnValue(of({id:5,name:name,strength:12}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        inputElement.value = name;
        addButton.triggerEventHandler('click',null);
        fixture.detectChanges();
        const heroText=fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    })
})