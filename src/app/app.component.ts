import { Component } from '@angular/core';
import { ElectronService } from './core/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalStatusService } from './global/globalStatus.service';
import { GlobalSettingService } from './global/globalSetting.service';
import { GameService } from './core/game.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private globalStatusService: GlobalStatusService,
    private globalSettingService: GlobalSettingService,
    private gameService: GameService) {

    translate.setDefaultLang('cn');
    globalSettingService.Init();
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('electron is correctly injected?', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('nodeJs childProcess is correctly injected?', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
  keyup(event: KeyboardEvent) {
    // 只要找到按下的键，对应是谁就行了
    const code = event.code;
    if (this.globalSettingService.GlobalSetting.SpeedUpKey === code) { this.gameService.KeyMapperTrigger('SpeedUpKey')}
    if (this.globalSettingService.GlobalSetting.UseSkillKey === code) { this.gameService.KeyMapperTrigger('UseSkillKey')}
  }
}
