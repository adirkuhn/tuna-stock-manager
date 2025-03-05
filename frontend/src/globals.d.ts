console.log('globals.d.ts is loaded');

interface TunaData {
    ajaxUrl: string;
    siteUrl: string;
}

declare global {
    interface Window {
        tunaData: TunaData;
    }
}

export {};