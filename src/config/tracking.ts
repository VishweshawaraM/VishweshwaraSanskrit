// Advertising measurement settings.
//
// META_PIXEL_ID: paste the numeric Pixel ID from Meta Events Manager to switch measurement on.
// While it is empty the site loads no tracker, shows no consent banner, and the Privacy Notice
// says the site uses no advertising trackers. Once it is set, the Pixel still loads ONLY after a
// visitor taps "Accept", and the Privacy Notice changes to describe it. Do not set it before
// the Privacy Notice has been read and approved by the Acharya. (ID 1463962406795146 set 20 Nov 2026; awaiting his approval of the notice before it goes live.)
export const META_PIXEL_ID = '1463962406795146';

export const TRACKING_ENABLED = /^\d{8,20}$/.test(META_PIXEL_ID);
