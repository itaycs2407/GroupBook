chrome.tabs.query({}, function (tabs) {
  const groupsId = new Set(
    tabs
      .filter((tab) => tab.groupId !== -1)
      .map((tabInGroup) => tabInGroup.groupId)
  );

  console.log(groupsId);
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

  const mock = [
    {
      collapsed: true,
      color: "purple",
      id: 1553868745,
      title: "test12",
      windowId: 281838957,
      tabsInCurrentGroup: [
        {
          url: "chrome://extensions/",
          title: "Extensions",
        },
        {
          url: "https://developer.chrome.com/docs/extensions/reference/tabs/",
          title: "chrome.tabs - Chrome Developers",
        },
        {
          url: "https://developer.chrome.com/docs/extensions/reference/tabGroups/#type-TabGroup",
          title: "chrome.tabGroups - Chrome Developers",
        },
        {
          url: "chrome://version/",
          title: "About Version",
        },
      ],
    },
    {
      collapsed: true,
      color: "grey",
      id: 789379518,
      title: "qwsw",
      windowId: 281838957,
      tabsInCurrentGroup: [
        {
          url: "https://developer.chrome.com/docs/extensions/reference/tabGroups/#type-TabGroup",
          title: "chrome.tabGroups - Chrome Developers",
        },
        {
          url: "https://developer.chrome.com/docs/extensions/reference/tabGroups/#type-TabGroup",
          title: "chrome.tabGroups - Chrome Developers",
        },
      ],
    },
  ];

  // mock.forEach((group) => {
  //   chrome.bookmarks.create(
  //     { parentId: "1", title: group.title },
  //     function (newFolder) {
  //       console.log(newFolder.id, group);
  //       console.log("added folder: " + newFolder.title + newFolder.id);

  //       const newFolderId = newFolder.id;
  //       group.tabsInCurrentGroup.forEach((tab) => {
  //         chrome.bookmarks.create({
  //           parentId: newFolderId,
  //           title: tab.title,
  //           url: tab.url,
  //         });
  //       });
  //     }
  //   );
  // });
});

const helper = () => {
  return new Promise((resolve, reject) => {
    const groupsData = [];

    chrome.tabs.query({}, function (tabs) {
      const groupsId = new Set(
        tabs
          .filter((tab) => tab.groupId !== -1)
          .map((tabInGroup) => tabInGroup.groupId)
      );

      console.log(groupsId);

      groupsId.forEach((groupId) => {
        chrome.tabs.query({}).then((tabs) => {
          const tabsInCurrentGroup = tabs
            .filter((tab) => tab.groupId === groupId)
            .map((tab) => {
              return { url: tab.url, title: tab.title };
            });

          // console.log(tabsInCurrentGroup);

          chrome.tabGroups
            .get(groupId)
            .then((data) => groupsData.push({ ...data, tabsInCurrentGroup }));
        });
      });

      console.log(groupsData);
    });

    resolve(groupsData);
  });
};

const convertGroupToBookmark = (groupTitle, tabs) => {
  console.log("from func", groupTitle, tabs);

  chrome.bookmarks.create(
    { parentId: "1", title: groupTitle },
    function (newFolder) {
      const newFolderId = newFolder.id;
      tabs.forEach((tab) => {
        chrome.bookmarks.create({
          parentId: newFolderId,
          title: tab.title,
          url: tab.url,
        });
      });
    }
  );
};

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.type) {
    case "getGroups":
      helper().then((res) => {
        setTimeout(() => {
          response(res);
        }, 100);
      });
      return true;
      break;
    case "converGroup":
      setTimeout(() => {
        convertGroupToBookmark(msg.groupTitle, msg.tabs);
      }, 100);
      return true;
      break;
    default:
      response("unknown request");
      break;
  }
});
