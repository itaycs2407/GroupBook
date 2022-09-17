chrome.tabs.query({}, function (tabs) {
  const groupsId = new Set(
    tabs
      .filter((tab) => tab.groupId !== -1)
      .map((tabInGroup) => tabInGroup.groupId)
  );

  const groupsData = [];

  groupsId.forEach((groupId) => {
    chrome.tabs.query({}, function (tabs) {
      const tabsInCurrentGroup = tabs
        .filter((tab) => tab.groupId === groupId)
        .map((tab) => {
          return { url: tab.url, title: tab.title };
        });

      chrome.tabGroups.get(groupId, (data) =>
        groupsData.push({ ...data, tabsInCurrentGroup })
      );
    });
  });

  console.log(groupsData);

  // groupsData.forEach((group) => {
  //   chrome.bookmarks.create(
  //     { parentId: "1", title: group.title },
  //     function (newFolder) {
  //       console.log(newFolder.id, group);
  //       console.log("added folder: " + newFolder.title + newFolder.id);
  //     }
  //   );
  // });

  // groupsData.forEach((group) => {
  //   console.log(group.title);
  //   chrome.bookmarks
  //     .create({ parentId: "1", title: group.title })
  //     .then((newFolder) => {
  //       const newFolderId = newFolder.id;
  //       group.tabsInCurrentGroup.forEach((tab) => {
  //         chrome.bookmarks.update(newFolderId, {
  //           title: tab.title,
  //           url: tab.url,
  //         });
  //       });
  //     });
  // });

  // console.log(chrome.bookmarks.getTree());
  // chrome.bookmarks.create(
  //   { parentId: "1", title: "Extension bookmarks" },
  //   function (newFolder) {
  //     console.log("added folder: " + newFolder.title + newFolder.id);
  //   }
  // );
  // // do whatever you want with the tab
});
