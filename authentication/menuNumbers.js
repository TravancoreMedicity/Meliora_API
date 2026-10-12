/*
    menu_master.menu_slno of the diet / cash functions.

    The numbers below are only the DEFAULTS (the numbers the web sidebar,
    Meliora/src/Menus/DietTransactions.js, uses). The numbers the server really accepts are read
    from the database: at start-up (and every 10 minutes) loadMenuNumbers() looks each function up in
    menu_master BY NAME (active rows only) and a user may use the function if they hold the
    default number OR any number the database gives that name. So a database that numbers a menu
    differently still works without changing code.

    Examples seen in the test database:
      * "Daily User Bill Closing" is 375 in menu_master but the users who run it hold 358 (the
        sidebar number) - both are accepted.
      * Diet Approval has no menu of its own; the sidebar reuses 41 (In-Patient List) - only 41.

    requireMenuRight(MENU_X) calls expandMenu(MENU_X) on every request, so a reload takes effect
    without a restart. If the database lookup fails, the defaults keep working.
*/
// key: [default number, menu_master.menu_name or null (= defaults only)]
const DEFINITIONS = {
    MENU_PETTY_CASH: [376, "User Petty Cash"],
    MENU_DAILY_CLOSING: [358, "Daily User Bill Closing"],
    MENU_CANTEEN_CLOSING: [374, "Daily Canteen Closing"],
    MENU_CANTEEN_ORDER_DETAIL: [43, "Canteen Order Detail"],
    MENU_KOT_ITEM_LIST: [56, "KOT Item List"],
    MENU_DIET_PRICE: [338, "Diet Room Type Grouping Master"],
    MENU_DIET_MASTER: [36, "Diet Master"],
    MENU_DIET_TYPE: [39, "Diet Type"],
    MENU_DIET_MENU_SETTING: [55, "Diet Menu Setting"],
    MENU_DIET_TYPE_GROUPING: [339, "Diet Type Grouping"],
    MENU_SPECIALITY: [349, "Diet Speciality Master"],
    MENU_ITEM_TYPE: [361, "Item Type Master"],
    MENU_ALLERGEN: [362, "Diet Allergency Master"],
    MENU_DIET_TEMPLATE: [363, "Diet Template Master"],
    MENU_CANTEEN_HIGHLIGHT: [353, "Canteen Highlight"],
    MENU_HIGHLIGHT_MAPPING: [360, "Canteen Highlight mapping"],
    MENU_FINAL_SETTLEMENT: [357, "Patient Final Settlement"],
    MENU_DIET_PROCESS: [42, "Diet Process"],           // also guards legacy extra order / delivery mark
    MENU_DIET_APPROVAL: [41, null],                    // sidebar reuses 41 (In-Patient List)
    MENU_KOT_PREP_DELIVERY: [38, "KOT Preperation / Delivery"],
};

const numbers = {};          // MENU_X -> main number (what the routers pass to requireMenuRight)
const accepted = new Map();  // main number -> Set of every number accepted for it

Object.entries(DEFINITIONS).forEach(([key, [main]]) => {
    numbers[key] = main;
    accepted.set(main, new Set([main]));
});

// every menu number that is accepted when the router asked for `menuSlno`
const expandMenu = (menuSlno) => {
    const known = accepted.get(Number(menuSlno));
    return known ? Array.from(known) : [Number(menuSlno)];
};

const normalise = (text) => String(text || "").trim().replace(/\s+/g, " ").toLowerCase();

// reads menu_master and widens `accepted`; never throws
const loadMenuNumbers = (pool, callBack) => {

    pool.query(
        "SELECT menu_slno, menu_name FROM menu_master WHERE menu_status = 1",
        (error, rows) => {

            if (error) {
                console.error("menu numbers: could not read menu_master, using the defaults:", error.message);
                if (callBack) callBack(error);
                return;
            }

            const byName = new Map();
            rows.forEach(row => {
                const key = normalise(row.menu_name);
                if (!byName.has(key)) byName.set(key, []);
                byName.get(key).push(Number(row.menu_slno));
            });

            const summary = [];

            Object.entries(DEFINITIONS).forEach(([key, [, menuName]]) => {
                const main = numbers[key];
                const set = new Set([main]);

                if (menuName) {
                    const found = byName.get(normalise(menuName)) || [];
                    found.forEach(slno => set.add(slno));
                    if (found.length === 0) {
                        console.warn(`menu numbers: no active menu named "${menuName}" in menu_master, using ${main}`);
                    } else if (found.length > 1) {
                        console.warn(`menu numbers: "${menuName}" exists ${found.length} times in menu_master (${found.join(", ")}), all accepted`);
                    }
                }

                accepted.set(main, set);
                summary.push(`${key}=${Array.from(set).join("/")}`);
            });

            console.log("menu numbers loaded from menu_master:", summary.join(" "));
            if (callBack) callBack(null);
        }
    );
};

// first load + refresh; the timer does not keep the process alive
const startMenuNumberRefresh = (pool, everyMs = 10 * 60 * 1000) => {
    loadMenuNumbers(pool);
    const timer = setInterval(() => loadMenuNumbers(pool), everyMs);
    if (timer.unref) timer.unref();
};

module.exports = { ...numbers, expandMenu, loadMenuNumbers, startMenuNumberRefresh };
