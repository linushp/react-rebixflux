import EventBus from './EventBus';


export const ActionEvent = "ActionEvent";
export const CommandEvent = "CommandEvent";

export default new EventBus("ActionEventBus");