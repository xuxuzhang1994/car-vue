import maintenance from './maintenance.vue';
import maintenanceRecommend from './maintenance-recommend/maintenance-recommend';
import maintenanceCycle from './maintenance-cycle/maintenance-cycle';
import maintenanceFeedback from './maintenance-feedback/maintenance-feedback';
import maintenanceHome from './maintenance-home/maintenance-home';
import maintenanceConfig from './maintenance-config/maintenance-config';
import maintenanceOtherConfig from './maintenance-other-recommend/maintenance-other-recommend';

let maintenanceModule = [
    { path: '/maintenance', component: maintenance, meta:{title:'maintenance'} },
]
maintenanceModule=maintenanceModule.concat(
    maintenanceRecommend,
    maintenanceCycle,
    maintenanceFeedback,
    maintenanceHome,
    maintenanceConfig,
    maintenanceOtherConfig
);

export default maintenanceModule;