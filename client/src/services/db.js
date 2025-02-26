import { openDB } from "idb";

const dbPromise = openDB("SomaliSeaTraceDB", 1, {
  upgrade(db) {
    db.createObjectStore("catches", { keyPath: "id" });
  },
});

export async function saveCatch(catchData) {
  const db = await dbPromise;
  await db.put("catches", catchData);
}

export async function getUnsyncedCatches() {
  const db = await dbPromise;
  const allCatches = await db.getAll("catches");
  return allCatches.filter((catchData) => !catchData.synced);
}

export async function syncCatches() {
  const unsynced = await getUnsyncedCatches();
  if (unsynced.length === 0) return;

  console.log(`Syncing ${unsynced.length} catches to blockchain...`);
  try {
    const response = await fetch("http://localhost:5001/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(unsynced),
    });
    if (!response.ok) throw new Error("Sync failed");

    const db = await dbPromise;
    const tx = db.transaction("catches", "readwrite");
    for (const catchData of unsynced) {
      await tx.store.put({ ...catchData, synced: true });
    }
    await tx.done;
    console.log("Sync complete!");
  } catch (error) {
    console.error("Sync error:", error);
    throw error;
  }
}

export async function getCatchById(id) {
  const db = await dbPromise;
  return await db.get("catches", id);
}

export async function updateCatch(catchData) {
  const db = await dbPromise;
  await db.put("catches", catchData);
}
