exports.committeeLookupJSON = [
  {
    $lookup: {
      from: 'users',
      localField: 'presidentId',
      foreignField: '_id',
      as: 'presidentData',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'generalSecretaryId',
      foreignField: '_id',
      as: 'generalSecretaryData',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'vicePresident01Id',
      foreignField: '_id',
      as: 'vicePresident01Data',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'vicePresident02Id',
      foreignField: '_id',
      as: 'vicePresident02Data',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'jointSecretary01Id',
      foreignField: '_id',
      as: 'jointSecretary01Data',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'jointSecretary02Id',
      foreignField: '_id',
      as: 'jointSecretary02IdData',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'financeSecretaryId',
      foreignField: '_id',
      as: 'financeSecretaryData',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'religionSecretaryId',
      foreignField: '_id',
      as: 'religionSecretaryData',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'librarySecretary01Id',
      foreignField: '_id',
      as: 'librarySecretary01Data',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'librarySecretary02Id',
      foreignField: '_id',
      as: 'librarySecretary02Data',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'member01Id',
      foreignField: '_id',
      as: 'member01Data',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'member02Id',
      foreignField: '_id',
      as: 'member02Data',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'member03Id',
      foreignField: '_id',
      as: 'member03Data',
    },
  },
]

exports.getFormattedCommittees = (_committees) =>
  _committees.map((_item) => ({
    ..._item,
    members: [
      {
        designation: 'president',
        ...(_item.presidentData?.[0] || {}),
      },
      {
        designation: 'general-secretary',
        ...(_item.generalSecretaryData?.[0] || {}),
      },
      {
        designation: 'vice-president-01',
        ...(_item.vicePresident01Data?.[0] || {}),
      },
      {
        designation: 'vice-president-02',
        ...(_item.vicePresident02Data?.[0] || {}),
      },
      {
        designation: 'joint-secretary-01',
        ...(_item.jointSecretary01Data?.[0] || {}),
      },
      {
        designation: 'joint-secretary-02',
        ...(_item.jointSecretary02IdData?.[0] || {}),
      },
      {
        designation: 'finance-secretary',
        ...(_item.financeSecretaryData?.[0] || {}),
      },
      {
        designation: 'religion-secretary',
        ...(_item.religionSecretaryData?.[0] || {}),
      },
      {
        designation: 'library-secretary-01',
        ...(_item.librarySecretary01Data?.[0] || {}),
      },
      {
        designation: 'library-secretary-02',
        ...(_item.librarySecretary02Data?.[0] || {}),
      },
      {
        designation: 'member-01',
        ...(_item.member01Data?.[0] || {}),
      },
      {
        designation: 'member-02',
        ...(_item.member02Data?.[0] || {}),
      },
      {
        designation: 'member-03',
        ...(_item.member03Data?.[0] || {}),
      },
    ],
  }))

exports.getFormattedAppCommittees = (_committees) =>
  _committees.map((_item) => ({
    members: _item.members,
    actingYear: _item.actingYear,
    presidentId: _item.presidentId,
    presidentSpeech: _item.presidentSpeech,
    generalSecretaryId: _item.generalSecretaryId,
    generalSecretarySpeech: _item.generalSecretarySpeech,
    vicePresident01Id: _item.vicePresident01Id,
    vicePresident02Id: _item.vicePresident02Id,
    jointSecretary01Id: _item.jointSecretary01Id,
    jointSecretary02Id: _item.jointSecretary02Id,
    financeSecretaryId: _item.financeSecretaryId,
    religionSecretaryId: _item.religionSecretaryId,
    librarySecretary01Id: _item.librarySecretary01Id,
    librarySecretary02Id: _item.librarySecretary02Id,
    member01Id: _item.member01Id,
    member02Id: _item.member02Id,
    member03Id: _item.member03Id,

    adminId: _item.adminId,
    readableId: _item.readableId,
    createdAt: _item.createdAt,
    updatedAt: _item.updatedAt,
    isActive: _item.isActive,
  }))
