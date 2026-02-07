import { useState, useEffect } from 'react';

export interface ScheduleItem {
    day: string;
    time: string;
    service: string;
}

const JSONBIN_CONFIG = {
    BASE_URL: 'https://api.jsonbin.io/v3/b',
    BIN_ID: 'REPLACE_WITH_YOUR_BIN_ID',
    API_KEY: 'REPLACE_WITH_YOUR_API_KEY'
};

const DEFAULT_SCHEDULE: ScheduleItem[] = [
    { day: "Senin", time: "07.30 - 12.00 WIB", service: "Pelayanan Umum" },
    { day: "Selasa", time: "07.30 - 12.00 WIB", service: "Pelayanan Umum + KIA" },
    { day: "Rabu", time: "07.30 - 12.00 WIB", service: "Pelayanan Umum" },
    { day: "Kamis", time: "07.30 - 12.00 WIB", service: "Pelayanan Umum + Imunisasi" },
    { day: "Jumat", time: "Tutup", service: "Pelayanan Umum + Posbindu" },
    { day: "Sabtu", time: "07.30 - 11.00 WIB", service: "Pelayanan Umum" },
    { day: "Minggu", time: "Tutup", service: "Libur" },
];


export const useSchedule = () => {
    const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
        try {
            if (typeof window === 'undefined') return DEFAULT_SCHEDULE;
            const saved = localStorage.getItem('ponkesdes_schedule');
            if (!saved) return DEFAULT_SCHEDULE;
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : DEFAULT_SCHEDULE;
        } catch (e) {
            console.warn('Failed to parse saved schedule, using default.', e);
            return DEFAULT_SCHEDULE;
        }
    });

    useEffect(() => {
        const fetchSchedule = async () => {
            if (JSONBIN_CONFIG.BIN_ID === 'REPLACE_WITH_YOUR_BIN_ID') return;

            try {
                const response = await fetch(`${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}/latest`, {
                    headers: {
                        'X-Master-Key': JSONBIN_CONFIG.API_KEY
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.record && Array.isArray(data.record)) {
                        setSchedule(data.record);
                        localStorage.setItem('ponkesdes_schedule', JSON.stringify(data.record));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch schedule from JSONbin:", error);
            }
        };

        fetchSchedule();
    }, []);

    const updateSchedule = (newSchedule: ScheduleItem[]) => {
        setSchedule(newSchedule);
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('ponkesdes_schedule', JSON.stringify(newSchedule));
            }
        } catch (e) {
            console.warn('Failed to save schedule to localStorage', e);
        }
    };

    return { schedule, updateSchedule };
};
