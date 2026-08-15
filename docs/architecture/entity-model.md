# Entity model

Ключевые сущности: Article, LegalDocument, Requirement, QualificationPath, Organization, RegistryRecord, Event, RatingEdition.

LegalDocument содержит или подтверждает Requirement. Requirement применяется к ролям и отраслям. QualificationPath связывает требования с последовательностью действий. Organization и RegistryRecord отделяют профиль СВАРКОД от первичного источника. RatingEdition неизменяемо фиксирует период, дату среза, версию методики и набор данных.
