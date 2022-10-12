export function sortObjList(objList: Array<any>, param: string) {
  return objList.sort((a, b) => {
    const fa = a[param].toLowerCase()
    const fb = b[param].toLowerCase()

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
}
