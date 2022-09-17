const getGroupsData = () => {
  return new Promise((resolve, reject) => {
    const groupsData = [];

    chrome.tabs.query({}, function (tabs) {
      const groupsId = new Set(
        tabs
          .filter((tab) => tab.groupId !== -1)
          .map((tabInGroup) => tabInGroup.groupId)
      );

      groupsId.forEach((groupId) => {
        chrome.tabs.query({}).then((tabs) => {
          const tabsInCurrentGroup = tabs
            .filter((tab) => tab.groupId === groupId)
            .map((tab) => {
              return { url: tab.url, title: tab.title };
            });

          chrome.tabGroups
            .get(groupId)
            .then((data) => groupsData.push({ ...data, tabsInCurrentGroup }));
        });
      });
    });

    resolve(groupsData);
  });
};

const convertGroupToBookmark = (groupTitle, tabs) => {
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
      getGroupsData().then((res) => {
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
