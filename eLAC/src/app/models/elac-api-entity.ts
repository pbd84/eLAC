export class ElacApiEntity {
// ### schema for response data from API Service ###
  // ### -> merged data from Object API and Query API ###

    autocomplete: string;
    selectors: Array<string>;
    context: string;
    count: string | number;
    nextLink: string;
    value: string[];

    constructor(json: any) {
        this.context = json['@odata.context'];
        this.count = json['@odata.count'];
        this.nextLink = json['@odata.nextLink'];
        this.autocomplete = json['@a5.autocomplete'];
        this.selectors = json['@a5.selector'];
        this.value = json.value.map(item => new ElacApiQueryEntity(item));
    }

    get autocompletes() {
        return this.autocomplete ? this.autocomplete['autocomplete']['buckets'] : null;
    }

    isFirstPage(): boolean {
        return this.selectors["$skip"] === 0;
    }

    isLastPage(): boolean {
        return !this.nextLink;
    }

    isCurrentPage(page: number): boolean {
        return this.selectors["$skip"] === (page) * 10;
    }

    pageCount(): number {
        return Math.ceil(<number>this.count / 10);
    }

    pageSize(): number {
        return 10;
    }

    get dataset() {
        return this.value;
    }

}

export class ElacApiQueryEntity {
  // ### schema for response data from Query API Service ###

    HitHighlight?: Array<string>;
    ID?: string;
    MetadataType?: string;
    Title?: string;
    AccessLevel?: string;
    Description?: Array<string>;
    ObjectLanguage?: string;
    IsPartOf?: string;
    Keywords?: Array<string>;
    ProjectName?: string;
    ProjectDescription?: string;
    Location?: string;
    Country?: string;
    Region?: string;
    GeoLocation?: string;
    LegacyBlob?: string;
    Creator?: string;
    RecordingDate?: string;
    ResourceType?: Array<string>;
    ResourceMimeType?: Array<string>;
    MetadataObject?: Array<string>;

    constructor(entity: any) {
        this.HitHighlight = entity['@a5.highlight'];
        this.ID = entity.id;
        this.MetadataType = entity.MetadataType;
        this.Title = entity.Title;
        this.AccessLevel = entity.accessLevel;
        this.Description = entity.Description;
        this.ObjectLanguage = entity.ObjectLanguage;
        this.IsPartOf = entity.IsPartOf;
        this.Keywords = entity.Keywords;
        this.ProjectName = entity.ProjectName;
        this.ProjectDescription = entity.ProjectDescription;
        this.GeoLocation = entity.GeoLocation;
        this.Location = entity.Location;
        this.Country = entity.Country;
        this.Region = entity.Region;
        this.LegacyBlob = entity.LegacyBlob;
        this.Creator = entity.Creator;
        this.RecordingDate = entity.RecordingDate;
        this.ResourceType = entity.ResourceType;
        this.ResourceMimeType = entity.ResourceMimeType;
        this.MetadataObject = entity.MetadataObject;
    }

    get highlight() {
        return this.HitHighlight;
    }

    get id() {
        return this.ID;
    }

    get type() {
        return this.MetadataType;
    }

    get title() {
        return this.Title;
    }

    get creator() {
        return this.Creator;
    }

    get accessLevel() {
        return this.AccessLevel;
    }

    get description() {
        return this.Description || '<no description available>';
    }

    get shortDescription() {
        return this.Description.toString().split(".")[0];
    }

    get geolocation() {
        return this.GeoLocation;
    }

    get languages() {
        return this.ObjectLanguage;
    }

    get keywords() {
        return this.Keywords;
    }

    get country() {
        return this.Country;
    }

    get location() {
        return this.Location;
    }

    get region() {
        return this.Region;
    }

    get projectName() {
        return this.ProjectName;
    }

    get projectDescription() {
        return this.ProjectDescription;
    }

    get resourceMimeType() {
        return this.ResourceMimeType;
    }

    get resourceType() {
        return this.ResourceType;
    }

    get metadataObject() {
        return this.MetadataObject;
    }

    get routeId() {
        return this.ID ? this.ID[0].replace('hdl:', '') : this.ID.replace('hdl:', '');
    }

    get routePrefix() {
        return this.MetadataType[0].toLowerCase();
    }

    get routeParent() {
        return this.IsPartOf ? this.IsPartOf[0].replace('hdl:', '') : this.IsPartOf.replace('hdl:', '');
    }

    get isBundle() {
        return this.MetadataType[0] == 'Bundle';
    }

    get isCollection() {
        return this.MetadataType[0] == 'Collection';
    }
}

export class ElacApiObjectEntity {

  // ### schema for response data from Object API Service ###

    odataID?: string;
    odataMediaReadLink?: string;
    odataReadLink?: string;
    odataSpectrum?: string;
    odataWaveform?: string;
    AccessRights?: string;
    Checksum?: string;
    id?: string;
    label?: string;
    contentType?: string;
    duration?: number;
    fileUri?: string;
    fileExists?: boolean;
    fileCreated?: string;
    fileUpdated?: string;
    fileSize?: number;
    parentOf?: string[];
    relatedTo?: string;
    objectType: string[];

    constructor(entity: any) {
        this.odataID = entity['@odata.id'];
        this.odataMediaReadLink = entity['@odata.mediaReadLink'];
        this.odataReadLink = entity['@odata.readLink'];
        this.odataSpectrum = entity['Spectrum@odata.mediaReadLink'];
        this.odataWaveform = entity['Waveform@odata.mediaReadLink'];
        this.AccessRights = entity.accessRights;
        this.Checksum = entity.checksum;
        this.id = entity.id;
        this.label = entity.label;
        this.contentType = entity.contentType;
        this.duration = entity.duration;
        this.fileUri = entity.fileUri;
        this.fileExists = entity.fileExists;
        this.fileCreated = entity.fileCreated;
        this.fileUpdated = entity.fileUpdated;
        this.fileSize = entity.fileSize;
        this.parentOf = entity.parentOf;
        this.relatedTo = entity.relatedTo;
        this.objectType = entity.objectType;
    }

    get mediaReadLink() {
        return this.odataMediaReadLink;
    }

    get readLink() {
        return this.odataReadLink;
    }

    get spectrum() {
        return this.odataSpectrum;
    }

    get waveform() {
        return this.odataWaveform;
    }

    get accessRights() {
        return this.AccessRights;
    }

    get checksum() {
        return this.Checksum;
    }

    get routeId() {
        return this.id ? this.id.replace('hdl:', '') : this.id[0].replace('hdl:', '');
    }

    get title() {
        return this.label.split('.')[0];
    }

    get fileid() {
        return this.id;
    }

    get mimetype() {
        return this.contentType;
    }

    get datatype() {
        return this.objectType
    }

    get uri() {
        return this.fileUri;
    }

    get size() {
        return this.fileSize;
    }

    get creationDate() {
        return this.fileCreated;
    }

    get updateDate() {
        return this.fileUpdated;
    }

    get fileParentOf() {
        return this.parentOf.map(value => new ElacApiObjectEntity(value));
    }
}
