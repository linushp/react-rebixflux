import EventBus from './EventBus';

export const ActionEvent = "ActionEvent";
export const CommandEvent = "CommandEvent";

export default new EventBus("ActionDispatcher", function (listener, m1, m2, m3, m4, m5) {

    try {
        listener(m1, m2, m3, m4, m5);
    } catch (e) {
        console.log(e);
    }

});